import React from 'react';
import'./NotificationPopover.css';

const NotificationPopover = ({ notifications }) => {
    return (
        <div className={"popover"}>
            <ul className={"list"}>
                {notifications.map((notif, index) => (
                    <li key={index} className={"item"}>
                        {notif.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default NotificationPopover;
