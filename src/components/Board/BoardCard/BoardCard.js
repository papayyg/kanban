import React from 'react'

const BoardCard = (elem) => {
  return (
    elem?.deals?.map((deal) => (
        <a href={deal.href} className='board_card' style={{background: deal.color}} key={deal?.id} id={deal?.id} draggable="true" onClick={(e) => e.preventDefault()}>
            <div className='card_info flex j-between a-center'>
               {/* <p className='card_date'>№ {deal?.id} от {deal?.date}</p>  */}
               <p className='card_date'>{deal?.name}</p> 
               {elem.showManager && <div className='card_manager' onClick={() => console.log(deal?.manager?.split(" ")?.slice(1,3)?.map(word => word?.charAt(0))?.join(""))}>{deal?.manager?.length === 0 ? "" : deal?.manager?.split(" ")?.length === 1 ? deal?.manager?.charAt(0) : deal?.manager?.split(" ")?.length === 2 ? deal?.manager?.split(" ")?.slice(0,3)?.map(word => word?.charAt(0))?.join("") : deal?.manager?.split(" ")?.slice(1, 3)?.map(word => word?.charAt(0))?.join("")}</div>}
            </div>
            {deal?.client && <p className='card_client'>{deal?.client}</p>}
            {deal?.appealType && <p className='card_appealType'>{deal?.appealType}</p>}
            {elem?.showResponsible ?
            <div className='card_responsible'>
                <p>Ответственный:</p>
                <span>{deal?.responsible}</span>
            </div> : null
            }
            {deal?.appartment && <p className='card_appartment'>{deal?.appartment}</p>}
            {deal?.more?.map((el) => (
                <div className='card_responsible'>
                <p>{el?.value}</p>
                <span>{el?.label}</span>
            </div>
            ))}
            <div className='card_details flex a-center'>
                {deal?.cost && <p className='card_cost'>{deal?.cost} ₽,</p> }
                {deal?.area && <p className='card_area flex a-center'>{deal?.area} м<sup>2</sup></p>}
            </div>
            <div className='card_functions flex a-center j-between'>
                <div className='card_functions-left flex a-center'>
                    <button id={`card_task${deal?.id}`} className='default_btn flex a-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11.5 6C12.0523 6 12.5 5.55228 12.5 5C12.5 4.44772 12.0523 4 11.5 4C10.9477 4 10.5 4.44772 10.5 5C10.5 5.55228 10.9477 6 11.5 6Z" fill="#127CCA"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M19 10.5346V19.5C19 20.8807 17.8807 22 16.5 22H6.5C5.11929 22 4 20.8807 4 19.5V6.5C4 5.11929 5.11929 4 6.5 4H7.80001C8.03164 2.85888 9.04052 2 10.25 2H12.75C13.9595 2 14.9684 2.85888 15.2 4H16.5C17.2353 4 17.8965 4.31746 18.3539 4.82279C18.8262 4.42858 19.5782 4.49884 20.0796 5.00025L21.3524 6.27304C21.8796 6.80025 21.9301 7.60447 21.4653 8.06931L19 10.5346ZM13.632 4.31829L13.8921 5.6H16.5C16.792 5.6 17.0516 5.73909 17.216 5.95464L11.708 11.4626C11.5063 11.6643 11.3935 11.9415 11.3901 12.2437L11.3755 13.531C11.3668 14.3013 12.0513 14.9858 12.8216 14.9771L14.1089 14.9626C14.4111 14.9592 14.6883 14.8463 14.89 14.6446L17.4 12.1346V19.5C17.4 19.9971 16.9971 20.4 16.5 20.4H6.5C6.00294 20.4 5.6 19.9971 5.6 19.5V6.5C5.6 6.00294 6.00294 5.6 6.5 5.6H9.10786L9.36803 4.31829C9.45128 3.90816 9.81645 3.6 10.25 3.6H12.75C13.1836 3.6 13.5487 3.90816 13.632 4.31829ZM20.5668 7.05861L19.294 5.78582C19.2589 5.75067 19.2053 5.7473 19.1743 5.77829L17.9959 6.95664L19.396 8.35671L20.5743 7.17836C20.6053 7.14737 20.602 7.09376 20.5668 7.05861ZM12.599 12.3536L17.2104 7.74221L18.6104 9.14228L13.9991 13.7536C13.9856 13.7671 13.9671 13.7746 13.947 13.7748L12.6597 13.7894C12.6083 13.7899 12.5627 13.7443 12.5633 13.6929L12.5778 12.4056C12.578 12.3855 12.5856 12.367 12.599 12.3536Z" fill="#127CCA"/>
                        </svg>
                        ({deal?.tasks})
                    </button>
                    <button id={`card_add${deal?.id}`} className='default_btn flex a-center j-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="1.7" stroke="#127CCA" strokeWidth="1.6"/>
                            <path d="M12.7987 7.8C12.7987 7.35817 12.4406 7 11.9987 7C11.5569 7 11.1987 7.35817 11.1987 7.8V11.2009L7.79997 11.201C7.35814 11.201 6.99998 11.5592 7 12.0011C7.00002 12.4429 7.3582 12.801 7.80003 12.801L11.1987 12.8009V16.2021C11.1987 16.6439 11.5569 17.0021 11.9987 17.0021C12.4406 17.0021 12.7987 16.6439 12.7987 16.2021V12.8009L16.1974 12.8008C16.6392 12.8008 16.9974 12.4426 16.9973 12.0008C16.9973 11.559 16.6391 11.2008 16.1973 11.2008L12.7987 11.2009V7.8Z" fill="#127CCA"/>
                        </svg>
                    </button>
                </div>
                <div className='card_function-right flex a-center'>
                    <button id={`card_call${deal?.id}`} className='default_btn flex a-center j-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4.61825 5.22899L4.64081 5.20321L4.66109 5.17559C4.71069 5.10805 4.76633 5.04306 4.82819 4.9813L5.52454 4.28607C6.17367 3.63798 7.22667 3.63798 7.8758 4.28607L10.6612 7.06697C11.3096 7.71436 11.3096 8.76344 10.6612 9.41082L9.96484 10.106C9.60502 10.4653 9.4359 11.1266 9.84541 11.6561C10.1997 12.1142 10.5878 12.5555 11.0094 12.9764C11.4309 13.3973 11.873 13.7847 12.3317 14.1384C12.8607 14.5462 13.5211 14.3782 13.8807 14.0192L14.577 13.324C15.2262 12.6759 16.2792 12.6759 16.9283 13.324L19.7137 16.1049C20.3621 16.7523 20.3621 17.8014 19.7137 18.4488L19.1988 18.9628L19.1689 18.9927L19.1422 19.0256C19.0789 19.1039 19.0112 19.179 18.9392 19.2509C18.0067 20.1819 16.3946 20.4737 14.3431 19.9242C12.3154 19.3811 10.0247 18.0462 7.99073 16.0155C6.00585 14.0338 4.68421 11.8075 4.1163 9.8191C3.54157 7.80684 3.77185 6.19589 4.61825 5.22899Z" stroke="#127CCA" strokeWidth="1.6"/>
                        </svg>
                    </button>
                    <button id={`card_message${deal?.id}`} className='default_btn flex a-center j-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.15962 5.61908C2.37273 4.97601 2.85911 4.41487 3.60527 4.14354C3.86641 4.04858 4.14215 4 4.42002 4H19.58C19.8579 4 20.1336 4.04858 20.3947 4.14354C21.1409 4.41487 21.6273 4.97601 21.8404 5.61909C21.9436 5.89307 22 6.18994 22 6.5V17.5C22 18.8807 20.8807 20 19.5 20H4.5C3.11929 20 2 18.8807 2 17.5V6.5C2 6.18994 2.05645 5.89306 2.15962 5.61908ZM3.67218 6.14627C3.80961 5.82506 4.12852 5.6 4.5 5.6H19.5C19.8715 5.6 20.1904 5.82507 20.3278 6.14628C20.4333 6.48512 20.3103 6.88864 19.9409 7.08018L12.4143 10.9829C12.1545 11.1176 11.8455 11.1176 11.5857 10.9829L4.05909 7.08019C3.68967 6.88865 3.56669 6.48512 3.67218 6.14627ZM20.4 8.64444V17.5C20.4 17.9971 19.9971 18.4 19.5 18.4H4.5C4.00294 18.4 3.6 17.9971 3.6 17.5V8.64445L10.8492 12.4033C11.5708 12.7774 12.4292 12.7774 13.1508 12.4033L20.4 8.64444Z" fill="#127CCA"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className='board_line' style={{background: deal.border}}></div>
            <a className='board_cover' href={deal.href} id={deal?.id} onDragStart={() => elem.setDragEnter(deal)} onClick={(e) => e.preventDefault()}></a>
        </a>
    ))
  )
}

export default BoardCard