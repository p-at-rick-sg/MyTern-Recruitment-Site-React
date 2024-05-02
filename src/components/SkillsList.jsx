import {useState, useEffect} from 'react';

//MUI Imports
import {Button, InputLabel, Select, MenuItem, TextField} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';

//Component Imports
import SkillsModal from './UserComponents/SkillsModal';

export default function SkillsList({
  resumeObj,
  setSkillsFields,
  skillsFields,
  setShowSkillsModal,
  toDelete,
  setToDelete,
}) {
  const [addSkillModal, setAddSkillModal] = useState(false);
  const [skillArr, setSkillArr] = useState([]);

  const getSkills = async () => {
    console.log('fetching the full skills list');
    const skillsResult = await fetch(import.meta.env.VITE_SERVER + '/api/skills', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(skillsResult.status);
    if (skillsResult.status === 200) {
      const tmpSkillArr = await skillsResult.json();
      console.log(tmpSkillArr);
      await setSkillArr(tmpSkillArr);
      console.log(skillArr);
    }
  };

  useEffect(() => {
    console.log('effect to get the skills list arr');
    getSkills();
  }, []);

  const deleteById = id => {
    //update state
    setSkillsFields(oldValues => {
      return oldValues.filter(skill => skill.skill_id !== id);
    });
    //create the delete items to send to the database on commit
    setToDelete([...toDelete, {skillId: id}]);
  };

  const handleChange = (e, id) => {
    const updatedSkillsFields = skillsFields.map(skill => {
      return skill.skill_id === id
        ? {...skill, [e.target.name]: e.target.value, changed: true}
        : skill;
    });
    setSkillsFields(updatedSkillsFields);
  };

  const handleValidated = (e, id) => {
    console.log(e.target.checked);
    const updatedSkillsFields = skillsFields.map(skill => {
      return skill.skill_id === id
        ? {...skill, [e.target.name]: e.target.checked, changed: true}
        : skill;
    });
    setSkillsFields(updatedSkillsFields);
  };

  const handleAdd = () => {
    console.log('should open the modal');
    setAddSkillModal(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Skills</h1>
          <p className="mt-2 text-sm text-gray-700">
            Here's The Skills We Extracted from Your Resume
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={handleAdd}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add Skill
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Skill Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Level (1-5)
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Years Experience
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Validated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {skillsFields &&
                  skillsFields.map(skill => (
                    <tr key={skill.skill_id} id={skill.skill_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {skill.skill_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <input
                          type="number"
                          name="level"
                          min="1"
                          max="5"
                          value={skill.level}
                          onChange={e => handleChange(e, skill.skill_id)}></input>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={skill.experience}
                          name="experience"
                          onChange={e => handleChange(e, skill.skill_id)}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <input
                          type="checkbox"
                          name="validated"
                          value={skill.validated}
                          onChange={e => handleValidated(e, skill.skill_id, skill.validated)}
                        />
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Button
                          id={skill.skill_id}
                          size="small"
                          onClick={() => deleteById(skill.skill_id)}
                          sx={{
                            color: 'red',
                            margin: -2,
                            ml: 1,
                            '&.MuiButtonBase-root:hover': {
                              bgcolor: 'transparent',
                              color: 'pink',
                            },
                          }}>
                          <RemoveCircleIcon id={skill.skill_id} />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {addSkillModal && (
        <SkillsModal
          setAddSkillModal={setAddSkillModal}
          setSkillsFields={setSkillsFields}
          skillArr={skillArr}
        />
      )}
    </div>
  );
}
