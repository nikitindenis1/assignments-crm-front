import React, { Component } from 'react';
import navigations from '../navbar/navigations';
import { Link } from 'react-router-dom'
class Categories extends Component {
    render() {
        return (
            <div className='dashboard__categories flex__start'>
                <div className='page__flex flex__start'>
                    {navigations.filter(n => n.value).map((m, i) => {
                        return <Link
                            className='dashboard__categories__link flex__column'
                            to={m.url}
                            key={i}
                        >

                            {m.img}
                            <h3>{m.text}</h3>
                        </Link>
                    })}
                </div>
            </div>
        );
    }
}

export default Categories;
