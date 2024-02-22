'use client'
import { Editor } from "@monaco-editor/react";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { toast } from "sonner";


const options = {
    "acceptSuggestionOnCommitCharacter": true,
    "acceptSuggestionOnEnter": "on",
    "accessibilitySupport": "auto",
    "autoIndent": true,
    "automaticLayout": true,
    "codeLens": true,
    "colorDecorators": true,
    "contextmenu": true,
    "cursorBlinking": "blink",
    "cursorSmoothCaretAnimation": false,
    "cursorStyle": "line",
    "disableLayerHinting": false,
    "disableMonospaceOptimizations": false,
    "dragAndDrop": false,
    "fixedOverflowWidgets": false,
    "folding": true,
    "foldingStrategy": "auto",
    "fontLigatures": false,
    "formatOnPaste": true,
    "formatOnType": true,
    "hideCursorInOverviewRuler": false,
    "highlightActiveIndentGuide": true,
    "links": true,
    "mouseWheelZoom": true,
    "multiCursorMergeOverlapping": true,
    "multiCursorModifier": "alt",
    "overviewRulerBorder": true,
    "overviewRulerLanes": 2,
    "quickSuggestions": true,
    "quickSuggestionsDelay": 100,
    "readOnly": false,
    "renderControlCharacters": false,
    "renderFinalNewline": true,
    "renderIndentGuides": true,
    "renderLineHighlight": "all",
    "renderWhitespace": "none",
    "revealHorizontalRightPadding": 30,
    "roundedSelection": true,
    "rulers": [],
    "scrollBeyondLastColumn": 5,
    "scrollBeyondLastLine": true,
    "selectOnLineNumbers": true,
    "selectionClipboard": true,
    "selectionHighlight": true,
    "showFoldingControls": "mouseover",
    "smoothScrolling": false,
    "suggestOnTriggerCharacters": true,
    "wordBasedSuggestions": true,
    "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
    "wordWrap": "on",
    "wordWrapBreakAfterCharacters": "\t})]?|&,;",
    "wordWrapBreakBeforeCharacters": "{([+",
    "wordWrapBreakObtrusiveCharacters": ".",
    "wordWrapColumn": 80,
    "wordWrapMinified": true,
    "wrappingIndent": "none"
}

const Solution = () => {

    const { resolvedTheme } = useTheme();

    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState();

    const markAsDone = async () => {
        try {

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="mt-10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your code.</h2>
                <Select onValueChange={e => setLanguage(e)}>
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
            <Editor
                className="rounded-lg overflow-hidden max-w-full"
                height="500px"
                defaultLanguage="cpp"
                language={language}
                theme={resolvedTheme === 'dark' ? "vs-dark" : 'light'}
                loading={<Skeleton className={'w-full h-[500px]'} />}
                onChange={(e) => setCode(e)}
                code={code}
                options={options}
            />
            <Button className="ml-auto" onClick={markAsDone}>Mark as Done</Button>
        </div>
    )
}

export default Solution
