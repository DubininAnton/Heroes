
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {newheroesFetched, fetchHeroes} from './heroesSlice';
import {heroesFetched} from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { createSelector } from '@reduxjs/toolkit';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE


const HeroesList = ({newHero}) => {

    const filteredHeroesSelector = createSelector(
        (state) => state.heroes.activeChangedHero,
        (state) => state.heroes.heroes,
        (activeChangedHero, heroes) => {
            if (activeChangedHero === 'all') {
                return heroes;
            } else {
                return heroes.filter(item => item.element === activeChangedHero);
            }
        }
    );
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();


    // Использовал ReduxThunk
    useEffect(() => {
        dispatch(fetchHeroes());   
        // eslint-disable-next-line
    }, []);
    // 

    // Добавляю нового героя. Из HeroesAddForm Formik'ом собираю данные
    // отправляю через App сюда, добавляю в heroes и reduce'ю.
    // Если раскоммениторовать request новый герой будет записываться в heroes.json
    useEffect(()=> {
        if(newHero !== undefined) {
        // request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero)); 
        const newItem = [...filteredHeroes, newHero]
        newHeroAdd(newItem)
        }
        // eslint-disable-next-line
    },[newHero]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    // Удаление героя из списка. Если раскомментировать первую строчку герой будет удаляться и из базы данных.
    const onEraseHero =(id) => {
        // request(`http://localhost:3001/heroes/${id}`, 'DELETE');
        const changeHeroes = filteredHeroes.filter(heroesItem => heroesItem.id !==id)
        DeleteHero(changeHeroes)   
    }

   
    const DeleteHero = (arr) => {
        dispatch(heroesFetched(arr)) 
    }

    const newHeroAdd = (newHero) => {
        dispatch(newheroesFetched(newHero))
    }


    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem onEraseHero = {()=>onEraseHero(id)} key={id} {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
          {elements}
        </ul>
    )
}

export default HeroesList;