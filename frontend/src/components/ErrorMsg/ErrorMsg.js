import React from 'react'
import styles from './ErrorMsg.module.scss'
import cx from "classnames";
export default function ErrorMsg(props) {
    return (
        <div className={cx(styles.alert, styles.danger)}>
            {props.children}
        </div>
    )
}
