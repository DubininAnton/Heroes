import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useCallback } from "react";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters} = useSelector(state => state.filters)

    const  renderBtn = useCallback((filters) => {

        return filters.map(({value, name})=>{

            let elementClassName;

            switch(value) {
                case "":
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
            if(elementClassName === "btn btn-outline-dark") {
                return <button onClick={(e)=>filterItem(e, "all")} key ={uuidv4()} value={'all'} className={`${elementClassName}`}>Все</button> 
            } else {
                return <button onClick={(e)=>filterItem(e, value)} key ={uuidv4()} value={value} className={`${elementClassName}`}>{name}</button>
            }
        })
        // eslint-disable-next-line
    },[filters])

    // Первоначальная установка свойста active на кнопку "Все"
    useEffect((filters)=>{
        document.querySelectorAll(".btn").forEach((item)=>{
            if(item.value === "all") {
                item.classList.add("active")
            }})
    },[filters])
    // 
    // Фильтрация элементов
    const filterItem = (e, value) => {
        document.querySelectorAll(".btn").forEach((item)=>{
            item.classList.remove('active')});
        document.querySelectorAll(".btn").forEach((item)=>{
            if(e.target.value === item.value) {
                item.classList.add('active')
            } 
        })
        document.querySelectorAll(".cardItem").forEach((item)=>{
            item.style.display = "block"
            if(e.target.value !== item.dataset.element) {
                item.style.display="none"
            }
            if(e.target.value === "all") {
                item.style.display = "block"
            }
        }) 
    }
    // 

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