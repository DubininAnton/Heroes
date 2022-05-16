import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, useField, Field } from "formik";
import * as Yup from 'yup';
import { newheroesFetched } from "../heroesList/heroesSlice";
import { fetchedFilters } from "../heroesFilters/filtersSlice";


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {filters} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    
    useEffect(() => {
         dispatch(fetchedFilters())
    }, []);

    const MyTextField = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
          <>
            <div className="mb-3">
                <label className={props.classNameLabel}>{label}</label>
                    <input
                        {...field} 
                        required
                        type={props.type} 
                        name={props.name} 
                        className={props.classNameInput} 
                        id={props.id} 
                        placeholder={props.placeholder}/>
                
            </div>
            {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}
          </>
        );
      };
      const MyTextareaField = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
          <>
            <div className="mb-3">
                <label className={props.classNameLabel}>{label}</label>
                    <textarea
                        {...field} 
                        required
                        type={props.type} 
                        name={props.name} 
                        className={props.classNameInput} 
                        id={props.id} 
                        placeholder={props.placeholder}
                        style={{"height": '130px'}}/>
                
            </div>
            {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}
          </>
        );
      };

    const renderFilterList = (filters) => {
        if (filters.length === 0) {
            return <option className="text-center mt-5">Фильтров пока нет</option>
        }
        return filters.map(({label, name}) => {
            return label !== "Все" ? <option value={name} key ={uuidv4()}>{label}</option> : null
        })
    }

    const filter = renderFilterList(filters) 

    return (
      <Formik
        initialValues = {{
            name:'',
            description:'',
            element:''
        }}
        // validationSchema = {Yup.object({
        //     name: Yup.string()
        //             .min(2, "Минимум 2 символа"),
        //     description: Yup.string()
        //         .min(2, "Минимум 5 символа"),
        //     element: Yup.string().required("Выбирите один из вариантов")
            
        // })}
        onSubmit = {(values) => dispatch(newheroesFetched(values))}>
   
           {({resetForm})=>(
              <Form className="border p-4 shadow-lg rounded">

              <MyTextField label ='Имя нового героя' name = 'name' id = 'name' type = 'text' classNameInput='form-control' classNameLabel ='form-label fs-4' placeholder="Как меня зовут?"/>
  
              <MyTextareaField label ='Описание' name = 'description' id = 'text' classNameInput='form-control' classNameLabel ='form-label fs-4' placeholder="Что я умею?"/>
              
              <div className="mb-3">
                  <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                  <Field
                      name="element"
                      as="select"
                      className="form-select">
                          {filter}
                  </Field>
              </div>
              <button onClick={()=>{setTimeout(()=>{resetForm()},2000)}} type="submit" className="btn btn-primary">Создать</button>
          </Form> 
           )} 
      </Formik>
    )
}

export default HeroesAddForm;