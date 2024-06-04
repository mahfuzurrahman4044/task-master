import {
  CheckIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import TaskDetailsModal from './TaskDetailsModal';
import { useGetTaskByNameQuery, useGetUpdatePostMutation } from '../../redux/features/taskApi/taskApi';

const MyTasks = () => {
  const { name } = useSelector((state) => state.userSlice);
  // console.log( name)

  const { data: userSpecificTasks, isLoading, error } = useGetTaskByNameQuery(name, {
    skip: !name
  });

  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState(0);

  const handleDetails = (id) => {
    setTaskId(id);
    setIsOpen(!isOpen);
  };

  const [updateTask, { data }] = useGetUpdatePostMutation()

  const handleUpdate = (id, status) => {
    // console.log(id)
    const options = {
      id: id,
      data: status
    }

    updateTask(options)
  }

  return (
    <div>
      <TaskDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} taskId={taskId} />
      <h1 className="text-xl my-3">My Tasks</h1>
      <div className=" h-[750px] overflow-auto space-y-3">
        {userSpecificTasks?.map((item) => (
          <div
            key={item.id}
            className="bg-secondary/10 rounded-md p-3 flex justify-between"
          >
            <h1>{item.title}</h1>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  handleUpdate(item._id, { status: 'done' })
                }
                className="grid place-content-center"
                title="Done"
              >
                <CheckIcon className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
