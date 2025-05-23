import styled from "styled-components";

export const AppWrapper = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    border-radius: 10px;
    background: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: sans-serif;
`;

export const Header = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

export const InputSection = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

export const Button = styled.button`
    padding: 10px 15px;
    font-size: 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: #0056b3;
    }
`;

export const TodoList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const TodoItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ $done }) => ($done ? "#d4edda" : "#fff")};
    border-left: 5px solid ${({ $done }) => ($done ? "#28a745" : "#ccc")};
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
`;

export const TodoText = styled.span`
    flex: 1;
    cursor: pointer;
    text-decoration: ${({ $done }) => ($done ? "line-through" : "none")};
    color: ${({ $done }) => ($done ? "#888" : "#000")};
`;

export const TodoActions = styled.div`
    display: flex;
    gap: 10px;
`;

export const FilterSection = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

export const FilterButton = styled.button`
    margin: 0 5px;
    padding: 6px 12px;
    font-size: 14px;
    border: 1px solid ${({ $active }) => ($active ? "#007bff" : "#ccc")};
    background: ${({ $active }) => ($active ? "#007bff" : "#fff")};
    color: ${({ $active }) => ($active ? "#fff" : "#000")};
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background: #007bff;
        color: white;
    }
`;
