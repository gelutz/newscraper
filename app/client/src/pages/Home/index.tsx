import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosRequestConfig } from "axios";

import News from "../../@types/News";
import connection from "../../api/connection";
import NewsList from "../../components/NewsList";

// import { Container } from "./styles";

const Home: React.FC = () => {
  const { register, handleSubmit, getValues } = useForm<{ search: string }>();

  const [news, setNews] = useState<News[]>([]);

  const onSearch = handleSubmit(async (data) => {
    const values = getValues();

    const returned = await connection.get<News[]>("/news/search", {
      params: { title: values.search },
    });

    setNews(returned.data);
  });

  const fetchNews = async (
    params: AxiosRequestConfig | undefined = undefined
  ): Promise<News[]> => {
    const news = await connection.get<News[]>("/news", params);

    return news.data;
  };

  useEffect(() => {
    (async () => {
      const news = await fetchNews();
      const filteredNews: News[] = [];

      Object.keys(news).forEach((_, index) => {
        if (index < 20) {
          filteredNews.push(news[index]);
        }
      });

      setNews(filteredNews);
    })();
  }, []);

  return (
    <div className="p-8 bg-gray-900 shadow h-full">
      <header className="p-8 bg-gray-500 shadow-xl flex justify-between rounded-2xl">
        <div className="whitespace w-10"></div>
        <div className="searchbox">
          <div className="box bg-white-300 p-2 flex align-middle">
            <form onSubmit={onSearch}>
              <input
                {...register("search", { required: false })}
                type="text"
                name="search"
                id="search"
              />
            </form>
          </div>
        </div>
        <div className="media">
          <div className="h-10 rounded-2xl"></div>
          <div className="h-10 rounded-2xl"></div>
          <div className="h-10 rounded-2xl"></div>
        </div>
      </header>
      <div className="list w-full mt-8 bg-gray-600">
        <NewsList news={news} />
      </div>
    </div>
  );
};

export default Home;
