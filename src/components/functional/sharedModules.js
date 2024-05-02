export const getSkills = async () => {
  console.log('fetching the full skills list');
  try {
    const skillsResult = await fetch(import.meta.env.VITE_SERVER + '/api/skills', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (skillsResult.status === 200) {
      const tmpSkillArr = await skillsResult.json();
      return tmpSkillArr;
    }
  } catch (err) {
    console.error('failed to fetch skills listing');
    return [];
  }
};
