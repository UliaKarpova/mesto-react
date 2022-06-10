function Card(props) {
    const handleClick = () => {
        props.onCardClick(props.card)
    }
    return (
        <li key={props.card._id} className="grid__item">
            <div className="grid__photo" onClick={handleClick} 
            style={{
                backgroundImage: `url(${props.card.link})`
            }} />
            <div className="grid__signature">
                <h2 className="grid__text">{props.card.name}</h2>
                <div className="grid__like">
                    <button type="button" className="grid__heart" />
                    <span className="grid__likes-number">{props.card.likes.length}</span>
                </div>
            </div>
            <button type="button" className="grid__delete-item" />
        </li>
    )
}

export default Card;