import pdfplumber
import docx
import chardet


def read_document(file_path: str) -> str:
    if file_path.lower().endswith(".pdf"):
        return read_pdf(file_path)

    if file_path.lower().endswith(".docx"):
        return read_docx(file_path)

    if file_path.lower().endswith(".txt"):
        return read_txt(file_path)

    raise ValueError("Unsupported resume file format")


def read_pdf(path: str) -> str:
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text


def read_docx(path: str) -> str:
    document = docx.Document(path)
    return "\n".join(p.text for p in document.paragraphs)


def read_txt(path: str) -> str:
    with open(path, "rb") as f:
        raw = f.read()
        encoding = chardet.detect(raw)["encoding"] or "utf-8"
        return raw.decode(encoding, errors="ignore")
