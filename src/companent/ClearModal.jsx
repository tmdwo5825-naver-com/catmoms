import classes from './ClearModal.module.css'

function ClearModal({children, onCloseExplainBox}){
    return (
        <>
            <div className={classes.clearBackdrop} onClick={onCloseExplainBox} />
            <dialog open className={classes.modal}>
                {children}
            </dialog>
        </>
    )
}

export default ClearModal;