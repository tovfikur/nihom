import docx
from docx.oxml import parse_xml
from docx.oxml.ns import qn
import os
import zipfile
from PIL import Image
import io

def extract_docx_content(docx_path):
    """Extract text and images from a .docx file"""
    doc = docx.Document(docx_path)

    # Create output directory for images
    output_dir = os.path.splitext(docx_path)[0] + "_extracted"
    img_dir = os.path.join(output_dir, "images")
    os.makedirs(img_dir, exist_ok=True)

    # Extract text content
    content = []
    content.append("=" * 80)
    content.append("DOCUMENT CONTENT")
    content.append("=" * 80)
    content.append("")

    # Track image relationships
    image_count = 0

    # Process paragraphs
    for para in doc.paragraphs:
        text = para.text
        if text.strip():
            content.append(text)

        # Check for images in paragraph
        for run in para.runs:
            if 'graphicData' in run._element.xml:
                image_count += 1
                content.append(f"[IMAGE_{image_count}]")

    # Extract images from the docx (it's a zip file)
    try:
        with zipfile.ZipFile(docx_path, 'r') as zip_ref:
            # Get all image files from word/media/
            image_files = [f for f in zip_ref.namelist() if f.startswith('word/media/')]

            for idx, img_file in enumerate(image_files, 1):
                # Extract image
                img_data = zip_ref.read(img_file)

                # Get extension
                ext = os.path.splitext(img_file)[1]

                # Save image
                img_path = os.path.join(img_dir, f"image_{idx}{ext}")
                with open(img_path, 'wb') as f:
                    f.write(img_data)

                content.append(f"Image {idx} saved to: {img_path}")
    except Exception as e:
        content.append(f"Error extracting images: {e}")

    # Save text content
    text_file = os.path.join(output_dir, "content.txt")
    with open(text_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(content))

    print('\n'.join(content))
    print("\n" + "=" * 80)
    print(f"Content saved to: {text_file}")
    print(f"Images saved to: {img_dir}")
    print("=" * 80)

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        docx_path = sys.argv[1]
        extract_docx_content(docx_path)
    else:
        print("Usage: python extract_docx.py <path_to_docx>")
