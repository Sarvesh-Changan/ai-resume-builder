import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../../service/AIModal";
import { toast } from "sonner";

const PROMPT = `Position Title: {positionTitle}.
Based on this position title, generate 3 bullet points describing relevant experience for a resume.
Do not include any experience level information.
Return the result strictly as plain HTML list items (e.g., <li>Your bullet point</li>), each on a new line.
Do not include any JSON formatting, brackets, braces, quotes, or keys like bullet_points, resume_points, or resume_bullet_points.`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultValue !== value) {
      setValue(defaultValue || '');
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onRichTextEditorChange(e);
  };


  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    const result = await AIChatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(
      resp
        .replace("[", "")
        .replace("[", "")
        .replace("]", "")
        .replace("]", "")
        .replace("resume_points", "")
        .replace("resume_bullet_points", "")
        .replace("{positionTitle}", "")
        .replace(":", "")
        .replace(":", "")
        .replace("{", "")
        .replace("}", "")
        .replace('"', "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
        .replace('"', "")
    );
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border-[#9f5bff] text-[#9f5bff]"
          onClick={GenerateSummaryFromAI}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
