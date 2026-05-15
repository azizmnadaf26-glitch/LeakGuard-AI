import cv2
import numpy as np
import hashlib
from imwatermark import WatermarkEncoder, WatermarkDecoder

def embed_watermark(image_path, user_id):
    """
    Hides user_id invisibly inside the image.
    Uses DWT-DCT method — survives compression,
    screenshot, and minor edits.
    Cannot be seen by human eyes.
    """

    # Read the image
    img = cv2.imread(image_path)

    if img is None:
        raise ValueError(f"Could not read image: {image_path}")

    # ── The watermark length ──
    # We take first 12 chars of user_id for better uniqueness
    # Example: "0x71C765..." becomes "0x71C76565432"
    watermark_text = user_id[:12].ljust(12) 
    watermark_bytes = watermark_text.encode('utf-8')

    # Embed the watermark invisibly
    encoder = WatermarkEncoder()
    encoder.set_watermark('bytes', watermark_bytes)
    watermarked_img = encoder.encode(img, 'dwtDct')

    # Save the watermarked image
    filename    = os.path.basename(image_path)
    output_path = f"uploads/watermarked_{filename}"
    cv2.imwrite(output_path, watermarked_img)

    print(f"SUCCESS: Invisible watermark embedded for user: {watermark_text}")
    return output_path


def extract_watermark(image_path):
    """
    Extracts the invisible watermark from an image.
    Returns the hidden user ID.
    """

    img = cv2.imread(image_path)

    if img is None:
        raise ValueError(f"Could not read image: {image_path}")

    # Extract hidden watermark
    # 96 = number of bits (12 characters x 8 bits)
    decoder   = WatermarkDecoder('bytes', 96)
    watermark = decoder.decode(img, 'dwtDct')

    try:
        extracted = watermark.decode('utf-8', errors='ignore').strip()
    except:
        extracted = "No watermark found"

    print(f"🔍 Extracted watermark: {extracted}")
    return extracted


def get_file_hash(file_path):
    """
    Generates unique fingerprint of the file.
    Same file = same hash always.
    """
    with open(file_path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()