import React from 'react';

import { format } from 'date-fns';
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
        <tbody>
            <tr key={props.id}>
                <td>
                    <div>{props.title}</div>
                </td>
                {/* whitespace */}
                <td>
                    <div>
                        <div>
                            <div>{format(new Date(props.date), 'dd/MM/yyyy')}</div>
                            <div>{props.origin}</div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default NewsCard;
