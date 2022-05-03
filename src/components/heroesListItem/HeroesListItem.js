import { Transition, TransitionGroup } from 'react-transition-group';

const HeroesListItem = ({name, description, element, onEraseHero, inProp}) => {
   

    // Transition
    const duration = 300;
   
    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
      }
    const transitionStyles = {
        entering: { opacity : 0, transform:'translateX(-100px)'},
        entered:  { opacity: 1, transform:'translateX(0)'},
        exiting:  { opacity: 1, transform:'translateX(0)' },
        exited:  { opacity: 0, transform:'translateX(-100px)'},
    }

    // 
    
    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        <TransitionGroup appear>
            <Transition in={inProp} timeout={duration}>
                {state => (
                    <ul style={{
                        ...defaultStyle,
                        ...transitionStyles[state]}}>
                        <li 
                                className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
                        <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                            className="img-fluid w-25 d-inline" 
                            alt="unknown hero" 
                            style={{'objectFit': 'cover'}}/>
                        <div className="card-body">
                            
                            <h3 className="card-title">{name}</h3>
                            <p className="card-text">{description}</p>
                        </div>
                        <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                            <button onClick={onEraseHero} type="button" className="btn-close btn-close" aria-label="Close"></button>
                        </span>
                        </li>
                    </ul>
                )}         
            </Transition>
        </TransitionGroup>
    )
}

export default HeroesListItem;