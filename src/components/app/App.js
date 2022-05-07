import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';


import './app.scss';

const App = () => {
    
    const [newHeroItem, setNewHeroItem] = useState();
    const addHero = (value) => {
        const newItemHero =  {
            name: value.name,
            description: value.description,
            element: value.element,
            id: uuidv4()
        }
        setNewHeroItem(newItemHero)
    }
    return (
        <main className="app">
            <div className="content">
                <HeroesList newHero={newHeroItem}/>
                <div className="content__interactive">
                    <HeroesAddForm addHero={addHero}/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;