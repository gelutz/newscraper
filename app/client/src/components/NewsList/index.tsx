import News from "../../@types/News";
import NewsCard from "../NewsCard";

// import { Container } from './styles';

const NewsList: React.FC<{ news: News[] }> = ({ news }) => {
  return (
    <div>
      <div>
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Título</th>
                  <th scope="col">Data</th>
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
