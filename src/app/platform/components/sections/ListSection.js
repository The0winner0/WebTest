import React from 'react';

const ListSection = ({ data }) => {
    if (!data) return null;

    const { title, listItems } = data;

    return (
        <section className="platform-section">
            <h2 className="platform-heading">{title}</h2>
            <div>
                <ul className="platform-list">
                    {listItems?.map(item => (
                        <li key={item.id} className="platform-list-item">
                            {item.itemText}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ListSection;