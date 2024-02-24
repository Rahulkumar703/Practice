'use client'
import { Skeleton } from "./ui/skeleton";
import { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { CheckCircle, Save } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LoadingButton from "./Button";
import { useSession } from "next-auth/react";
import { Editor } from "@monaco-editor/react";
import { useRouter } from "next/navigation";


// const options = {
//     "acceptSuggestionOnCommitCharacter": true,
//     "acceptSuggestionOnEnter": "on",
//     "accessibilitySupport": "auto",
//     "autoIndent": false,
//     "automaticLayout": true,
//     "codeLens": true,
//     "colorDecorators": true,
//     "contextmenu": true,
//     "cursorBlinking": "blink",
//     "cursorSmoothCaretAnimation": false,
//     "cursorStyle": "line",
//     "disableLayerHinting": false,
//     "disableMonospaceOptimizations": false,
//     "dragAndDrop": false,
//     "fixedOverflowWidgets": false,
//     "folding": true,
//     "foldingStrategy": "auto",
//     "fontLigatures": false,
//     "formatOnPaste": false,
//     "formatOnType": false,
//     "hideCursorInOverviewRuler": false,
//     "highlightActiveIndentGuide": true,
//     "links": true,
//     "mouseWheelZoom": false,
//     "multiCursorMergeOverlapping": true,
//     "multiCursorModifier": "alt",
//     "overviewRulerBorder": true,
//     "overviewRulerLanes": 2,
//     "quickSuggestions": true,
//     "quickSuggestionsDelay": 100,
//     "readOnly": false,
//     "renderControlCharacters": false,
//     "renderFinalNewline": true,
//     "renderIndentGuides": true,
//     "renderLineHighlight": "all",
//     "renderWhitespace": "none",
//     "revealHorizontalRightPadding": 30,
//     "roundedSelection": true,
//     "rulers": [],
//     "scrollBeyondLastColumn": 5,
//     "scrollBeyondLastLine": true,
//     "selectOnLineNumbers": true,
//     "selectionClipboard": true,
//     "selectionHighlight": true,
//     "showFoldingControls": "mouseover",
//     "smoothScrolling": false,
//     "suggestOnTriggerCharacters": true,
//     "wordBasedSuggestions": true,
//     "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
//     "wordWrap": "off",
//     "wordWrapBreakAfterCharacters": "\t})]?|&,;",
//     "wordWrapBreakBeforeCharacters": "{([+",
//     "wordWrapBreakObtrusiveCharacters": ".",
//     "wordWrapColumn": 80,
//     "wordWrapMinified": true,
//     "wrappingIndent": "none"
// }

const Solution = ({ userSolutions, isSolved, problemId }) => {

    const { resolvedTheme } = useTheme();

    const session = useSession();

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [language, setLanguage] = useState(userSolutions[0]?.language || 'cpp');
    const [code, setCode] = useState(userSolutions[0]?.code || '');
    const [solved, setSolved] = useState(isSolved || false);


    useEffect(() => {
        setCode(userSolutions[0]?.code.toString() || '');
        setSolved(isSolved || false);
        setLanguage(userSolutions[0]?.language || 'cpp');
    }, [userSolutions])


    const saveCode = async () => {
        try {
            setLoading(true);
            if (!session?.data?.user?.id)
                return toast.error('Please Login to perform this action')


            if (!code || code.toString().length < 10)
                return toast.info('Please write some code before saving')

            const res = await fetch('/api/solveProblem', {
                method: 'POST',
                'Content-Type': 'application/json',
                body: JSON.stringify({ solutions: [{ code, language, notes: [] }], solved, problemId, userId: session?.data?.user?.id })
            })
            const data = await res.json();
            toast[data.type](data.message);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            router.refresh();
        }
    }

    const togglesSolved = async () => {
        try {
            setLoading(true);
            if (!session?.data?.user?.id)
                return toast.error('Please Login to perform this action')


            if (!code || code.toString().length < 10)
                return toast.info('Please write some code before submitting')

            const res = await fetch('/api/solveProblem', {
                method: 'POST',
                'Content-Type': 'application/json',
                body: JSON.stringify({ solutions: [{ code, language, notes: [] }], solved: !solved, problemId, userId: session?.data?.user?.id })
            })

            if (res.ok) {
                setSolved(!solved);
            }
            const data = await res.json();
            toast[data.type](data.message)

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            router.refresh();
            setLoading(false);
        }
    }

    return (
        <div className="mt-10 flex flex-col gap-4">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <LoadingButton className={`ml-auto hover:shadow-lg transition-shadow ${solved ? 'bg-green-400 hover:bg-green-400/90' : 'bg-rose-400 hover:bg-rose-400/90'}`} disabled={loading}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {
                            solved ? 'Done' : 'Mark as Done'
                        }
                    </LoadingButton>

                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {
                                solved ?
                                    <>This will delete your code from database and you won&apos;t be able to recover it.</>
                                    :
                                    <>
                                        Before submitting your code, please note that we won&apos;t be validating your solution. We assume that you&apos;ve resolved the issue and verified your code independently.
                                        <span className="block mt-4 font-semibold"> You will be able to see your code for future reference.</span>
                                    </>
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <LoadingButton onClick={togglesSolved} disabled={loading}>
                                Continue
                            </LoadingButton>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your code.</h2>
                <div className="flex gap-2 items-center">
                    {

                    }
                    {
                        code !== userSolutions[0]?.code
                            ?
                            <LoadingButton size="sm" className="flex items-center" onClick={saveCode} disabled={loading}>
                                <Save className="w-4 h-4" />
                            </LoadingButton>
                            :
                            null

                    }
                    <Select defaultValue={language} onValueChange={e => setLanguage(e)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="C++" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cpp">C++</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="javascript">Javascript</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Editor
                className="rounded-lg overflow-hidden max-w-full "
                height="500px"
                defaultLanguage={language || 'cpp'}
                language={language}
                theme={resolvedTheme === 'dark' ? "vs-dark" : 'light'}
                loading={<Skeleton className={'w-full h-[500px]'} />}
                onChange={(e) => setCode(e)}
                value={code}
                onValidate={e => console.log(e)}
                options={{

                    fontSize: 18,
                    acceptSuggestionOnEnter: "smart",
                    autoClosingBrackets: "languageDefined",
                    autoClosingQuotes: "languageDefined",
                    automaticLayout: true,
                    bracketPairColorization: {
                        enabled: true,
                    },
                    autoIndent: "brackets",
                    copyWithSyntaxHighlighting: true,
                    cursorBlinking: "phase",
                    cursorSmoothCaretAnimation: 'on',
                    cursorWidth: 3,
                    inlayHints: {
                        enabled: true
                    },
                    formatOnPaste: true,
                    inlineSuggest: {
                        enabled: true
                    },
                    matchBrackets: "always",
                    mouseWheelZoom: true,
                    snippetSuggestions: "bottom",
                    suggest: { preview: true },
                    wordWrap: 'bounded'
                }}
            />
        </div>
    )
}

export default Solution
