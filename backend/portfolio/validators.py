from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.utils.deconstruct import deconstructible
from PIL import Image

IMAGE_EXTENSIONS = ("jpg", "jpeg", "png", "webp", "gif")
IMAGE_FORMATS = {"JPEG", "PNG", "WEBP", "GIF"}
MAX_IMAGE_BYTES = 5 * 1024 * 1024


@deconstructible
class ImageFormatValidator:
    """Rejects uploads that do not actually decode as an allowed image.

    Extension checks alone are bypassable; Pillow verifies the bytes really are
    the claimed format. Defaults additionally curb decompression-bomb payloads
    via PIL's pixel cap.
    """

    def __call__(self, value):
        try:
            image = Image.open(value)
            image.verify()
        except Exception as exc:
            raise ValidationError("Upload could not be read as a valid image.") from exc
        if image.format not in IMAGE_FORMATS:
            raise ValidationError("Only JPG, PNG, WEBP and GIF uploads are allowed.")


@deconstructible
class MaxBytesValidator:
    def __init__(self, max_bytes):
        self.max_bytes = max_bytes

    def __call__(self, value):
        if value.size > self.max_bytes:
            raise ValidationError(
                f"File too large (max {self.max_bytes // (1024 * 1024)} MB)."
            )

    def __eq__(self, other):
        return isinstance(other, MaxBytesValidator) and self.max_bytes == other.max_bytes

    def __ne__(self, other):
        return not self.__eq__(other)


image_validators = [
    FileExtensionValidator(IMAGE_EXTENSIONS),
    ImageFormatValidator(),
    MaxBytesValidator(MAX_IMAGE_BYTES),
]