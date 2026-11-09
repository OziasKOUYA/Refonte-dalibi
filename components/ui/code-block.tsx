'use client'

import { Copy01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Highlight, Prism, type PrismTheme } from 'prism-react-renderer'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const TAP_SPRING = { type: 'spring', stiffness: 500, damping: 30 } as const
const SWAP_SPRING = { type: 'spring', duration: 0.3, bounce: 0 } as const
const CHECK_SPRING = { type: 'spring', duration: 0.4, bounce: 0.35 } as const
const COPY_RESET_MS = 1800

export type CodeBlockProps = Omit<React.ComponentProps<'div'>, 'children'> & {
    /** The source code to render. */
    code: string
    /** Prism language id, e.g. "tsx", "css", "json", "bash". */
    language?: string
    /** Filename or path shown in the header. Falls back to the language id when omitted. */
    filename?: string
    /** Show the outer frame — background, border, rounded corners, and header. Turn off to render just the code. */
    showFrame?: boolean
    /** Show the header bar. Ignored when the frame is off. */
    showHeader?: boolean
    /** Show the line-number gutter. */
    showLineNumbers?: boolean
    /** Show the copy-to-clipboard button. */
    showCopyButton?: boolean
    /** Optional 1-based line numbers to highlight with an accent wash. Off when omitted. */
    highlightLines?: number[]
}
/*
 * Les couleurs viennent des variables --cb-* de globals.css (une palette par thème).
 * Fond et texte changent ensemble, sans JavaScript : ils ne peuvent pas se désynchroniser.
 */
const THEME: PrismTheme = {
    plain: { color: 'var(--cb-plain)', backgroundColor: 'transparent' },
    styles: [
        { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--cb-comment)' } },
        { types: ['punctuation', 'operator', 'combinator'], style: { color: 'var(--cb-muted)' } },
        { types: ['keyword', 'selector', 'atrule', 'important', 'tag', 'attr-name'], style: { color: 'var(--cb-flag)' } },
        { types: ['function', 'class-name', 'maybe-class-name', 'builtin'], style: { color: 'var(--cb-accent)' } },
        { types: ['string', 'char', 'inserted', 'url', 'regex'], style: { color: 'var(--cb-string)' } },
        { types: ['number', 'boolean', 'constant', 'symbol', 'deleted'], style: { color: 'var(--cb-number)' } },
        { types: ['property', 'variable', 'parameter'], style: { color: 'var(--cb-property)' } },
    ],
}

// Prism n'embarque pas le shell : ces deux grammaires couvrent les blocs de la documentation
const COMMENT = { pattern: /(^|\s)#.*/, lookbehind: true, greedy: true }
const STRING = { pattern: /"[^"]*"|'[^']*'/, greedy: true }
Prism.languages.shell = {
    comment: COMMENT,
    string: STRING,
    function: /^[a-z][\w.-]*/m,
    keyword: { pattern: /(\s)--?[a-z][\w-]*/, lookbehind: true },
    operator: /&&|\|\||>>/,
}
Prism.languages.dotenv = {
    comment: COMMENT,
    string: STRING,
    property: /^[A-Z_][A-Z0-9_]*(?==)/m,
    operator: /=/,
}

/* ------------------------------- copy button ------------------------------- */

function CopyButton({ code, floating }: { code: string; floating?: boolean }) {
    const [copied, setCopied] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => () => {
        if (timer.current) clearTimeout(timer.current)
    }, [])

    const copy = useCallback(async () => {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(code)
            } else {
                // Fallback for non-secure contexts where the Clipboard API is unavailable.
                const area = document.createElement('textarea')
                area.value = code
                area.style.position = 'fixed'
                area.style.opacity = '0'
                document.body.appendChild(area)
                area.select()
                document.execCommand('copy')
                area.remove()
            }
        } catch {
            return
        }
        setCopied(true)
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), COPY_RESET_MS)
    }, [code])

    const reduceMotion = useReducedMotion()
    const swap = reduceMotion
        ? {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
          }
        : {
              initial: { opacity: 0, scale: 0.5, filter: 'blur(4px)' },
              animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
              exit: { opacity: 0, scale: 0.5, filter: 'blur(4px)' },
          }

    return (
        <motion.button
            type='button'
            data-slot='code-block-copy'
            aria-label={copied ? 'Copié' : 'Copier le code'}
            onClick={copy}
            whileTap={reduceMotion ? undefined : { scale: 0.9 }}
            transition={TAP_SPRING}
            className={cn(
                'relative grid size-8 cursor-pointer place-items-center rounded-[200px] text-(--cb-muted) outline-none transition-[background-color,color] duration-150 ease-out hover:bg-(--cb-hover-wash) hover:text-(--cb-plain) focus-visible:ring-2 focus-visible:ring-(--cb-accent)/60',
                copied &&
                    'bg-(--cb-accent)/12 text-(--cb-accent) hover:bg-(--cb-accent)/12 hover:text-(--cb-accent)',
                floating &&
                    'absolute top-2.5 right-2.5 z-10 border border-(--cb-border) bg-(--cb-float-bg) backdrop-blur-md',
            )}
        >
            <AnimatePresence initial={false}>
                {copied ? (
                    <motion.span
                        key='check'
                        className='col-start-1 row-start-1'
                        {...swap}
                        transition={reduceMotion ? { duration: 0.15 } : CHECK_SPRING}
                    >
                        <svg
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth={2.5}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='size-3.5'
                            aria-hidden
                        >
                            <motion.path
                                d='M4 12.5l5 5L20 6.5'
                                initial={reduceMotion ? false : { pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.2, ease: 'easeOut', delay: 0.05 }}
                            />
                        </svg>
                    </motion.span>
                ) : (
                    <motion.span
                        key='copy'
                        className='col-start-1 row-start-1'
                        {...swap}
                        transition={reduceMotion ? { duration: 0.15 } : SWAP_SPRING}
                    >
                        <HugeiconsIcon icon={Copy01Icon} size={15} strokeWidth={1.6} aria-hidden />
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    )
}

export function CodeBlock({
    code,
    language = 'tsx',
    filename,
    showFrame = true,
    showHeader = true,
    showLineNumbers = true,
    showCopyButton = true,
    highlightLines,
    className,
    style,
    ...props
}: CodeBlockProps) {
    // don't crash on bad props
    const safeLanguage = typeof language === 'string' ? language : 'tsx'
    const trimmed = useMemo(() => {
        const source = typeof code === 'string' ? code : String(code ?? '')
        return source.replace(/^\n+/, '').trimEnd()
    }, [code])
    const highlighted = useMemo(
        () => new Set(Array.isArray(highlightLines) ? highlightLines : []),
        [highlightLines],
    )

    return (
        <div
            data-slot='code-block'
            className={cn(
                'group relative flex flex-col overflow-hidden text-left',
                showFrame && 'rounded-[20px] border border-(--cb-border) bg-(--cb-bg)',
                className,
            )}
            style={style}
            {...props}
        >
            {showFrame && showHeader && (
                <div
                    data-slot='code-block-header'
                    className='flex h-11 shrink-0 items-center gap-3 border-b border-(--cb-border) bg-(--cb-header-bg) pl-4 pr-2 backdrop-blur-md'
                >
                    <span className='min-w-0 flex-1 truncate text-[13.5px] text-(--cb-muted)'>
                        {filename ?? safeLanguage}
                    </span>
                    {showCopyButton && <CopyButton code={trimmed} />}
                </div>
            )}

            {!(showFrame && showHeader) && showCopyButton && <CopyButton code={trimmed} floating />}

            <div
                data-slot='code-block-viewport'
                role='region'
                aria-label={filename ? `Code : ${filename}` : 'Bloc de code'}
                tabIndex={0}
                className={cn(
                    'min-h-0 flex-1 overflow-auto outline-none selection:bg-(--cb-selection) focus-visible:ring-2 focus-visible:ring-(--cb-accent)/40 [scrollbar-width:thin] [scrollbar-color:var(--cb-border)_transparent]',
                    showFrame && 'py-3',
                )}
            >
                <Highlight code={trimmed} language={safeLanguage} theme={THEME}>
                    {({ tokens, getLineProps, getTokenProps }) => {
                        const gutterWidth = `${String(tokens.length).length}ch`
                        return (
                            <pre
                                data-slot='code-block-pre'
                                className='w-max min-w-full font-mono text-[13.5px] leading-[1.75] [tab-size:4]'
                            >
                                {tokens.map((line, i) => {
                                    const lineProps = getLineProps({ line })
                                    return (
                                        <div
                                            key={i}
                                            {...lineProps}
                                            className={cn(
                                                'relative flex min-w-full',
                                                showFrame && 'px-3.5',
                                                highlighted.has(i + 1) && 'bg-(--cb-line-wash)',
                                                lineProps.className,
                                            )}
                                        >
                                            {showLineNumbers && (
                                                <span
                                                    aria-hidden
                                                    className='mr-4 shrink-0 text-right text-(--cb-gutter) select-none'
                                                    style={{ width: gutterWidth }}
                                                >
                                                    {i + 1}
                                                </span>
                                            )}
                                            <span className='pr-3.5'>
                                                {line.map((token, key) => (
                                                    <span key={key} {...getTokenProps({ token })} />
                                                ))}
                                            </span>
                                        </div>
                                    )
                                })}
                            </pre>
                        )
                    }}
                </Highlight>
            </div>
        </div>
    )
}

export default CodeBlock
