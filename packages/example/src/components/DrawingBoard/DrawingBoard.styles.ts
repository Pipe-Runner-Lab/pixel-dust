import styled from 'styled-components';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > * + * {
    margin-top: 8px;
  }

  div:last-child {
    font-size: 14px;
    color: #9ca3af;
  }
`;

export const DrawingBoardContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  & > * + * {
    margin-left: 8px;
  }

  & > div {
    border-radius: 5px;
  }
`;

export const CanvasWrapper = styled.div`
  flex: 1;
  border: 1px #e1e8eb solid;
  overflow: hidden;
`;

export const ToolBoxWrapper = styled.div`
  width: 360px;
  border: 1px #e1e8eb solid;
`;

export const LayerBoxWrapper = styled.div`
  width: 140px;
  border: 1px #e1e8eb solid;
`;
