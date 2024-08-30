export function calculateProjectEndDate(
  projectType: 'three_month_project' | 'six_month_project'
): Date {
  const today = new Date();
  const monthsToAdd = projectType === 'three_month_project' ? 3 : 6;

  const resultDate = new Date(today);
  resultDate.setMonth(resultDate.getMonth() + monthsToAdd);

  return resultDate;
}
