import '../../assets/css/modal.css';

export default function Modal({ onCancle, title, visible, content }) {
  if (visible) {
    return (
      <div className='modal'>
        <div onClick={onCancle} className='mask'></div>
        <div className='body'>
          <p className='title'>{title}</p>
          <div className='content'>{content}</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
