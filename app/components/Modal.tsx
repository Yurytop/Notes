interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open : boolean) => boolean | void;
    children: React.ReactNode
}


const ModalAddNote: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
        <div className={`modal ${modalOpen ? 'modal-open' : ''} `}>
            <div className="min-w-fit modal-box relative">
                <label
                    onClick={() => setModalOpen(false)}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                   x 
                </label>
                {children}
            </div>
        </div>
    );
 };
export default ModalAddNote;




