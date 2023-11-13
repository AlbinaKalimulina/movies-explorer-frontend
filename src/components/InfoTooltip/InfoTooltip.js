// import React from 'react';

// function InfoTooltip({isOpen, image, onClose, message}) {

//     return (
//         <div
//             className={`popup ${isOpen && 'popup_opened'}`}>
//             <div className="popup__container">
//                 <img
//                     className="popup__info-image"
//                     alt="Картинка"
//                     src={image}/>

//                 <p className="popup__info-text">{message}</p>

//                 <button
//                     type="button"
//                     className="popup__button-close"
//                     onClick={onClose}>
//                 </button>
//             </div>
//         </div>

//     );
// }

// export default InfoTooltip;


function InfoTooltip({ isOpen, onClose, message }) {
  return (
    <div className={`popup ${isOpen && 'popup__opened'}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <p>{JSON.stringify(message)}</p>
      </div>
    </div>
  )
}

export default InfoTooltip