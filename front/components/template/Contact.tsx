import React from "react";
import styled from "styled-components";

interface IProps {
  send(): void;
  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  content: string;
}

export default function ContactTemplate(props: IProps) {
  return (
    <Wrapper>
      <p>お問い合わせ内容</p>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.send();
        }}
      >
        <textarea onChange={props.handleChange} value={props.content} />
        <Button type="submit" isDisabled={!props.content}>
          送信
        </Button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: calc(100vh - 44px);
  background-color: #fff;
  color: #444;
  padding: 16px;

  p {
    font-size: 16px;
    margin-bottom: 4px;
  }

  textarea {
    background-color: #f7f7f7;
    border: 1px solid #707070;
    border-radius: 16px;
    width: 100%;
    height: 16vh;
    padding: 12px;
  }
`;

interface IButtonProps {
  isDisabled: boolean;
}
const Button = styled.button`
  display: block;
  white-space: nowrap;
  min-width: 160px;
  background-color: #5f97c9;
  margin: 8px auto 0;
  padding: 8px 24px;
  border-radius: 9999px;
  font-size: 16px;
  color: #fff;
  box-shadow: ${(p: IButtonProps) =>
    p.isDisabled ? "none" : "0 1px 6px rgba(0, 0, 0, 0.25)"};
  opacity: ${(p: IButtonProps) => (p.isDisabled ? 0.66 : 1)};
  cursor: ${(p: IButtonProps) => (p.isDisabled ? "default" : "pointer")};
`;
