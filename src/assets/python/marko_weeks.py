"""
In an optimization problem, the returns status of Solve() is:
  FEASIBLE if a solution was found, but optimality was not proved,
  OPTIMAL if it was PROVED,
  UNKNOWN if no solution was found in the time limit,
  and INFEASIBLE if it was proven that no solution exists.
"""

from ortools.sat.python import cp_model


class HospitalSchedulingProblem(object):

  def __init__(self, areas, doctors, curriculum, specialties, weeks, working_days,
               schedules, versions, doctor_work_days):
    self.areas = areas
    self.doctors = doctors
    self.curriculum = curriculum
    self.specialties = specialties
    self.weeks = weeks
    self.working_days = working_days
    self.schedules = schedules
    self.versions = versions
    self.doctor_work_days = doctor_work_days


class HospitalSchedulingSatSolver(object):

  def __init__(self, problem):
    # Problem
    self.problem = problem

    # Utilities
    
    self.num_weeks = len(problem.weeks)
    self.num_days = len(problem.working_days)
    
    self.num_doctors = len(problem.doctors)
    self.num_areas = len(problem.areas)
    self.num_schedules = len(problem.schedules)
    self.num_versions = len(problem.versions)
    self.schedule_versions = [
        x * self.num_schedules + y
        for x in problem.schedules
        for y in problem.versions
    ]
    self.num_schedule_versions = self.num_schedules * self.num_versions

    all_schedule_versions = range(self.num_schedule_versions)
    all_doctors = range(self.num_doctors)
    all_weeks = range(self.num_weeks)
    all_days = range(self.num_days)
    all_versions = range(self.num_versions)
    all_areas = range(self.num_areas)
    all_schedules = range(self.num_schedules)

    self.model = cp_model.CpModel()

    # build all the possible permutations including the specialties
    self.assignment = {}
    for sv in all_schedule_versions:
      for w in all_weeks:
        for a in all_areas:
          for d in all_doctors:
            for day in all_days:
              if d in self.problem.specialties[a]:
                name = 'C:{%i} W:{%i} S:{%i} T:{%i} Slot:{%i}' % (sv, w, a, d, day)
                # print(name)
                self.assignment[sv, w, a, d, day] = self.model.NewBoolVar(name)
              else:
                name = 'NO DISP C:{%i} W:{%i} S:{%i} T:{%i} Slot:{%i}' % (sv, w, a, d, day)
                # print(name)
                self.assignment[sv, w, a, d, day] = self.model.NewIntVar(0, 0, name)

    # Constraints

    # Each schedule/version must have the quantity of areas specified in the curriculum
    # 8/15: All areas are required 5 days of the week
    for sch in all_schedules:
      for ver in all_versions:
        sch_ver = sch * self.num_versions + ver
        for week in all_weeks: 
          for area in all_areas:
            required_days = self.problem.curriculum[self.problem.schedules[
                sch], self.problem.areas[area]]
            self.model.Add(
                sum(self.assignment[sch_ver, week, area, doctor, day]
                    for day in all_days
                    for doctor in all_doctors) == required_days)

    # Doctor can work at only one area at a time (per day)
    for doctor in all_doctors:
      for week in all_weeks:
        for day in all_days:
          self.model.Add(
              sum([
                  self.assignment[sv, week, a, doctor, day]
                  for sv in all_schedule_versions
                  for a in all_areas
              ]) <= 1)

    # Ensure that each day of the week is accounted for and no duplicate days
    for week in all_weeks:
      for day in all_days:
        for a in all_areas:
          self.model.Add(
              sum([
                  self.assignment[sv, week, a, d, day]
                  for sv in all_schedule_versions
                  for d in all_doctors
              ]) == 1)

    # Maximum work days for each doctor
    for week in all_weeks:
      for doctor in all_doctors:
        self.model.Add(
            sum([self.assignment[sv, week, a, doctor, day] for sv in all_schedule_versions
                for a in all_areas for day in all_days
            ]) <= self.problem.doctor_work_days[doctor])
    

    # Doctor makes all the classes of a area's course
    # So if Ian can teach math and history, he can only teach it in his course
    # If Donald also teaches history, students in his course would never be taught by Ian
    # doctor_schedule_versions = {}
    # for level in all_schedules:
    #   for section in all_versions:
    #     course = level * self.num_versions + section
    #     for area in all_areas:
    #       for t in all_doctors:
    #         name = 'C:{%i} S:{%i} T:{%i}' % (course, area, doctor)
    #         doctor_schedule_versions[course, area, t] = self.model.NewBoolVar(name)
    #         temp_array = [
    #             self.assignment[course, area, t, slot] for slot in all_slots
    #         ]
    #         self.model.AddMaxEquality(doctor_schedule_versions[course, area, t],
    #                                   temp_array)
    #       self.model.Add(
    #           sum(doctor_schedule_versions[course, area, t]
    #               for t in all_doctors) == 1)

    # Solution collector
    self.collector = None

  def solve(self):
    print('Solving')
    a_few_solutions = [1, 2, 100, 1000, 5000, 50000, 100000, 2000000]

    solver = cp_model.CpSolver()

    # Sets a time limit of 10 seconds.
    solver.parameters.max_time_in_seconds = 5.0

    solution_printer = HospitalSchedulingSatSolutionPrinter(self.assignment, self.problem.weeks, self.problem.working_days,
      self.problem.doctors, self.problem.areas, self.problem.schedules, self.problem.versions, self.num_schedule_versions, a_few_solutions)
    status = solver.SearchForAllSolutions(self.model, solution_printer)
    print('- Statistics')
    print('  - Status = %s' % solver.StatusName(status))
    print('  - Branches', solver.NumBranches())
    print('  - Conflicts', solver.NumConflicts())
    print('  - WallTime', solver.WallTime())
    print('  - solutions found : %i' % solution_printer.SolutionCount())

  def print_status(self):
    pass


class HospitalSchedulingSatSolutionPrinter(cp_model.CpSolverSolutionCallback):

  def __init__(self, assignment, weeks, working_days, doctors, areas, schedules, versions, num_schedule_versions, sols):

    self.__weeks = weeks
    self.__working_days = working_days
    self.__doctors = doctors
    self.__areas = areas
    self.__schedules = schedules
    self.__versions = versions

    self.__assignment = assignment
    self.__num_weeks = len(weeks)
    self.__num_days = len(working_days)
    self.__num_doctors = len(doctors)
    self.__num_areas = len(areas)
    self.__num_schedules = len(schedules)
    self.__num_versions = len(versions)
    self.__num_schedule_versions = self.__num_schedules * self.__num_versions
    self.__solutions = set(sols)
    self.__solution_count = 0

  def NewSolution(self):
    self.__solution_count += 1
    if self.__solution_count in self.__solutions:
      print('\n')
      print('Solution #%i' % self.__solution_count)
      
      for sv in range(self.__num_schedule_versions):
        for w in range(self.__num_weeks):
          for a in range(self.__num_areas):
            for d in range(self.__num_doctors):
              for ts in range(self.__num_days):
                if self.Value(self.__assignment[(sv, w, a, d, ts)]):
                  area_name = self.__areas[a]
                  doctor_name = self.__doctors[d]
                  week_name = self.__weeks[w]
                  day_name = self.__working_days[ts]
                  print(' Schedule #%i | Week #%s | Area #%s | Doctor #%s | Day #%s' % (sv, week_name, area_name, doctor_name, day_name))
      print('\n')

  def SolutionCount(self):
    return self.__solution_count


def main():
  # DATA
  areas = ['RMC Body/ED', 'RMC Mamm/Breast', 'RMC US/PET/ED', 'RMC Dx4', 'RMC IR', 'SJH Dx/IR',
              'SJH PCAC Dx/Mammo', 'SFH Mamm/Neuro', 'SFH ER/Flouro/Nuclear', 'SFH IR', 'SFH Body/Chest']
  schedules = ['1'] # this is just here in case we need alternate specifications
  versions = ['A'] # this is just here in case we need alternate specifications
  doctors = ['Lum', 'Iwanik', 'Granato',
              'Clemins', 'Radich', 'Bahu',
              'Rapoport M', 'Rapoport L', 'Brack',
              'Reich', 'Simon', 'Skezas',
              'Calandra', 'Cronin', 'Major',
              'Kim', 'Hamblin']
  doctors_work_days = [3, 3, 3,
                        4, 4, 4,
                        4, 4, 4,
                        4, 5, 5,
                        4, 4, 4,
                        4, 5]
  weeks = ['Week 1', 'Week 2']
  working_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  # This curriculum needs to match up with the right amount of specialties
  # For example, this won't work:
  #  Having one person specialize solo in two departments. If we alott 5 days to each employee, this person cant be at two depts at once
  curriculum = {
      ('1', 'RMC Body/ED'): 5,
      ('1', 'RMC Mamm/Breast'): 5,
      ('1', 'RMC US/PET/ED'): 5,
      ('1', 'RMC Dx4'): 5,
      ('1', 'RMC IR'): 5,
      ('1', 'SJH Dx/IR'): 5,
      ('1', 'SJH PCAC Dx/Mammo'): 5,
      ('1', 'SFH Mamm/Neuro'): 5,
      ('1', 'SFH ER/Flouro/Nuclear'): 5,
      ('1', 'SFH IR'): 5,
      ('1', 'SFH Body/Chest'): 5
  }

  # Area -> List of doctors who can work in it
  specialties_idx_inverse = [
      [0, 1, 2, 3],      # RMC Body/ED
      [2, 3, 4],      # RMC Mamm/Breast
      [0, 6],      # RMC US/PET/ED
      [0, 4, 7, 8],      # RMC Dx4
      [3, 9],      # RMC IR
      [10],      # SJH Dx/IR
      [11],      # SJH PCAC Dx/Mammo
      [12, 13, 14],      # SFH Mamm/Neuro
      [13, 14, 15],     # SFH ER/Flouro/Nuclear
      [16],      # SFH IR
      [12, 13, 14]      # SFH Body/Chest
  ]
  


  problem = HospitalSchedulingProblem(
      areas, doctors, curriculum, specialties_idx_inverse, weeks, working_days,
      schedules, versions, doctors_work_days)
  solver = HospitalSchedulingSatSolver(problem)
  solver.solve()
  solver.print_status()


if __name__ == '__main__':
  main()