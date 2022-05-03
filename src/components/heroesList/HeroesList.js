import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Transition, TransitionGroup } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [inProp, setInProp] = useState(true);


    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    // Удаление героя из списка. Если раскомментировать первую строчку герой будет удаляться и из базы данных.
    const onEraseHero =(id) => {
        // request(`http://localhost:3001/heroes/${id}`, 'DELETE');
        setInProp(false)
        const changeHeroes = heroes.filter(heroesItem => heroesItem.id !==id)
        dispatch(heroesFetched(changeHeroes))
        
        
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem onEraseHero = {()=>onEraseHero(id)} key={id} {...props} inProp={inProp}/>
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
          {elements}
        </ul>
    )
}

export default HeroesList;