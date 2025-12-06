import type {Pet, PetAction} from "../../types/pet.types.ts";
import useEventLog from "../../hooks/useEventLog.ts";
import styled from 'styled-components';

const Button = styled.button`
    display: inline-block;
    outline: none;
    text-align: center;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 10px;
    border: 1px solid #413D1B;
    background: #B2AB73;
    color: #413D1B;
    transition: all ease 0.3s;

    &:hover {
        cursor: pointer;
        scale: 1.05;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        scale: 1;
    }
`;

const PetActions = ({
                        onClick,
                        pet,
                        access
                    }: {
    onClick: (action: PetAction) => void;
    pet: Pet;
    access: boolean;
}) => {
    const { setLog } = useEventLog();

    return (
        <>
            <Button
                disabled={!access}
                onClick={() => {
                    onClick({ type: "feed" });
                    setLog(`${pet.name} was fed!`);
                }}
            >
                FEED
            </Button>

            <Button
                disabled={!access}
                onClick={() => {
                    onClick({ type: "level up" });
                    setLog(`${pet.name} was leveled up!`);
                }}
            >
                LEVEL UP
            </Button>

            <Button
                disabled={!access}
                onClick={() => {
                    onClick({ type: "pet" });
                    setLog(`${pet.name} was petted!`);
                }}
            >
                PET
            </Button>

            <Button
                disabled={!access}
                onClick={() => {
                    onClick({ type: "reset" });
                    setLog(`Reset ${pet.name}!`);
                }}
            >
                RESET
            </Button>
        </>
    );
};

export default PetActions;
