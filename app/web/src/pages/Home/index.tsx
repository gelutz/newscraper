import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosRequestConfig } from 'axios';

import News from '../../@types/News';
import connection from '../../api/connection';
import NewsList from '../../components/NewsList';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';

// import { Container } from "./styles";

const Home: React.FC = () => {
    const { register, handleSubmit, getValues } = useForm<{ search: string }>();
    const { signOut } = useAuth();
    const [news, setNews] = useState<News[]>([]);

    const onSearch = handleSubmit(async () => {
        const values = getValues();

        const returned = await connection.get<News[]>('/news/search', {
            params: { title: values.search },
        });

        setNews(returned.data);
    });

    const fetchNews = async (
        params: AxiosRequestConfig | undefined = undefined
    ): Promise<News[]> => {
        const news = await connection.get<News[]>('/news', params);

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
        <div>
            <Header>
                <form onSubmit={onSearch}>
                    <input
                        {...register('search', { required: false })}
                        type="text"
                        placeholder="Search"
                        id="search"
                    />
                </form>
                <button onClick={signOut}>Logout</button>
            </Header>
            <div>
                <NewsList news={news} />
            </div>
        </div>
    );
};

export default Home;
