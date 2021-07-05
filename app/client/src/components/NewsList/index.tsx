import News from "../../@types/News";
import NewsCard from "../NewsCard";

// import { Container } from './styles';

const NewsList: React.FC<{ news: News[] }> = ({ news }) => {
  console.log(news);
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Título
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Data
                  </th>
                </tr>
              </thead>
              {news?.map((value) => {
                return value && <NewsCard {...value} key={value.id} />;
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
