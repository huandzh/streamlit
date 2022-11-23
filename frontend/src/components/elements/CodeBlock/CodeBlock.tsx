/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement, ReactNode, FunctionComponent } from "react"
import { ReactMarkdownProps } from "react-markdown/src/ast-to-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

import {
  CheckIfChildrenIncludesValidColors,
  PrepareColoredSpanJSXElements,
} from "src/components/shared/StreamlitMarkdown/StreamlitMarkdown"
import CopyButton from "./CopyButton"
import {
  StyledPre,
  StyledCodeBlock,
  StyledCopyButtonContainer,
} from "./styled-components"

export type CodeTagProps = JSX.IntrinsicElements["code"] &
  ReactMarkdownProps & { inline?: boolean }

export interface CodeBlockProps {
  node?: ReactNode
  children: ReactNode
}

/**
 * Renders code tag with highlighting based on requested language.
 */
export const CodeTag: FunctionComponent<CodeTagProps> = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "")
  const codeText = String(children).trim().replace(/\n$/, "")

  return !inline ? (
    <>
      {codeText && (
        <StyledCopyButtonContainer>
          <CopyButton text={codeText} />
        </StyledCopyButtonContainer>
      )}
      <StyledPre>
        <SyntaxHighlighter
          language={(match && match[1]) || ""}
          PreTag="div"
          customStyle={{ backgroundColor: "transparent" }}
          style={{}}
        >
          {codeText}
        </SyntaxHighlighter>
      </StyledPre>
    </>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}
export const CodeTagWithColoredText: FunctionComponent<CodeTagProps> = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "")
  const codeText = String(children).trim().replace(/\n$/, "")

  return !inline ? (
    <>
      {codeText && (
        <StyledCopyButtonContainer>
          <CopyButton text={codeText} />
        </StyledCopyButtonContainer>
      )}
      <StyledPre>
        <SyntaxHighlighter
          language={(match && match[1]) || ""}
          PreTag="div"
          customStyle={{ backgroundColor: "transparent" }}
          style={{}}
        >
          {codeText}
        </SyntaxHighlighter>
      </StyledPre>
    </>
  ) : (
    <code className={className} {...props}>
      {PrepareColoredSpanJSXElements(children)
        ? PrepareColoredSpanJSXElements(children).map(c => c)
        : children}
    </code>
  )
}

/**
 * Renders a code block with syntax highlighting, via Prismjs
 */
export function CodeBlock({ children }: Record<any, any>): ReactElement {
  return <StyledCodeBlock className="stCodeBlock">{children}</StyledCodeBlock>
}
export function CodeBlockWithColoredText({
  children,
  disableColoredText,
}: Record<any, any>): ReactElement {
  if (
    children &&
    children.length > 0 &&
    CheckIfChildrenIncludesValidColors(children)
  ) {
    return (
      <StyledCodeBlock className="stCodeBlock">
        {PrepareColoredSpanJSXElements(children).map(c => c)}
      </StyledCodeBlock>
    )
  }
  return <StyledCodeBlock className="stCodeBlock">{children}</StyledCodeBlock>
}
