from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
from torchvision import transforms
from PIL import Image
import numpy as np
import io

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the PyTorch model
model = torch.load('path_to_your_model.pth')
model.eval()  # Set the model to evaluation mode

# Define the image transformations
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),  # Adjust size as per model's requirement
    transforms.ToTensor(),  # Convert the image to a tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # Normalize the image
])

def preprocess_image(image: Image.Image) -> torch.Tensor:
    image = preprocess(image)  # Apply the transformations
    return image.unsqueeze(0)  # Add batch dimension

def make_prediction(processed_image: torch.Tensor, age: int, sex: str, localization: str) -> dict:
    # Here you would need to modify the model input to include age, sex, and localization
    # This is a placeholder for how you might combine these inputs
    # For example, you could concatenate them with the image data or use a different model architecture
    with torch.no_grad():  # Disable gradient calculation
        predictions = model(processed_image)  # Forward pass
    predicted_class = torch.argmax(predictions, dim=1).item()  # Get the predicted class
    predicted_probabilities = predictions.softmax(dim=1).tolist()[0]  # Get the probabilities for all classes
    return {
        "predicted_class": predicted_class,
        "predicted_probabilities": predicted_probabilities
    }

@app.post("/predict/")
async def predict(file: UploadFile = File(...), 
                  age: int = Form(...), 
                  sex: str = Form(...), 
                  localization: str = Form(...)):
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))

    processed_image = preprocess_image(image)
    prediction_result = make_prediction(processed_image, age, sex, localization)

    return JSONResponse(content=prediction_result)
