import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosRequestConfig } from "axios";

import News from "../../@types/News";
import connection from "../../api/connection";
import NewsList from "../../components/NewsList";
import Header from "../../components/Header";

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
      <Header>
        <form onSubmit={onSearch}>
          <input
            {...register("search", { required: false })}
            type="text"
            className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Search"
            id="search"
          />
        </form>
      </Header>
      <div className="list w-full mt-8 bg-gray-600">
        <NewsList news={news} />
      </div>
    </div>
  );
};

export default Home;
