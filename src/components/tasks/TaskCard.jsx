import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import {
  removeTask,
  // updateStatus,
} from '../../redux/features/tasks/tasksSlice';
import { useGetDeleteMutation, useGetUpdatePostMutation } from '../../redux/features/taskApi/taskApi';

const TaskCard = ({ task }) => {
  const [updateTask, { data, error }] = useGetUpdatePostMutation()
  // console.log(data)
  // console.log(error)

  let updatedStatus;

  const handleUpdate = (id, updatedStatus) => {
    const data = {
      status: updatedStatus
    }
    const options = {
      id: id,
      data: data
    }

    updateTask(options)
  }

  if (task.status === 'pending') {
    updatedStatus = 'running';
  } else if (task.status === 'running') {
    updatedStatus = 'done';
  } else {
    updatedStatus = 'archive';
  }


  const [deleteTask] = useGetDeleteMutation()

  const handleDelete = (id) => {
    deleteTask(id)
  }

  return (
    <div className="bg-secondary/10 rounded-md p-5">
      <h1
        className={`text-lg font-semibold mb-3 ${task.priority === 'high' ? 'text-red-500' : ' '
          } ${task.priority === 'medium' ? 'text-yellow-500' : ' '} ${task.priority === 'low' ? 'text-green-500' : ' '
          }`}
      >
        {task?.title}
      </h1>
      <p className="mb-3">{task?.description}</p>
      <p className="text-sm">Assigned to - {task?.assignedTo}</p>
      <div className="flex justify-between mt-3">
        <p>{task?.date}</p>
        <div className="flex gap-3">
          <button onClick={() => handleDelete(task._id)} title="Delete">
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
          <button
            onClick={() =>
              handleUpdate(task._id, updatedStatus)
            }
            title="Update Status"
          >
            <ArrowRightIcon className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
