import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';

import axios from 'axios';
import BackBtn from '../components/BackBtn';

const PizzaFrame: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    id: string;
    sizes: number[];
    types: number[];
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`https://62dfc893976ae7460bf39a43.mockapi.io/items/${id}`);
        setPizza(data.items);
      } catch (error) {
        alert('Ошибка при загрузке данных');
        console.error(error);
        navigate('/');
      }
    };

    fetchPizza();
  }, [id, navigate]);

  return (
    <article className='pizzaFrame'>
      {pizza ? (
        <>
          <div className='left'>
            <Pizza {...pizza} />
          </div>
          <div className='right'>
            <h2 className='title'>{pizza.title}</h2>
            <p className='descr'>
              Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
              Свой даль рекламных, рыбного запятой букв сбить коварный выйти повстречался?
            </p>
            <BackBtn />
          </div>
        </>
      ) : (
        <div className='left'>
          <Skeleton />
        </div>
      )}
    </article>
  );
};

export default PizzaFrame;
