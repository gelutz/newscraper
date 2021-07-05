import React from "react";

import { format } from "date-fns";
// import { Container } from './styles';

type News = {
  id: number;
  title: string;
  link: string;
  origin: string;
  date: Date;
};

const NewsCard: React.FC<News> = ({ children, ...props }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr key={props.id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{props.title}</div>
        </td>
        {/* whitespace */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {format(new Date(props.date), "dd/MM/yyyy")}
              </div>
              <div className="text-sm text-gray-500">{props.origin}</div>
            </div>
          </div>
        </td>

        {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td> */}
        {/* whitespace */}
      </tr>
    </tbody>
  );
};

export default NewsCard;
