import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { changedHero } from "../../actions";
import classNames from 'classnames'; 

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters} = useSelector(state => state.filters);
    const {activeChangedHero} = useSelector(state => state.heroes)
    const dispatch = useDispatch();

    const  renderBtn = (filters) => {

        return filters.map(({name, label})=>{

            let elementClassName;

            switch(name) {
                case "all":
                    elementClassName = "btn btn-outline-dark";
                    break;
                case "fire":
                    elementClassName = "btn btn-danger";
                    break;
                case "water":
                    elementClassName ="btn btn-primary";
                    break;
                case "wind":
                    elementClassName ="btn btn-success";
                    break; 
                case "earth":
                    elementClassName ="btn btn-secondary";
                    break;    
                default:
                    elementClassName="";
        
            }

            let btnClass = classNames({'active' : name === activeChangedHero})

                return name !=="" ? <button onClick={()=>dispatch(changedHero(name))} key ={uuidv4()} className={`${elementClassName} ${btnClass}`}>{label}</button> : null 
        })
       
    }

    const btn = renderBtn(filters)


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {btn}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;