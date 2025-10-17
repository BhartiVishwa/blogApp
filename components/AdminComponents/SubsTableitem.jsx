import React from 'react';
import { Trash2 } from "lucide-react";

const SubsTableitem = ({ email, mongoId, deleteEmail, date }) => {
  const emailDate = new Date(date);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {email || 'No email'}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">
          {emailDate.toDateString()}
        </span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => deleteEmail(mongoId)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default SubsTableitem;
