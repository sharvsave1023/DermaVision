from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
from torchvision import transforms
from PIL import Image
import numpy as np
import io

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #TO DO: REPLACE WITH DOMAINS
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TO DO: LOAD IN PYTORCH MODEL
model = torch.load('.pth')
model.eval()

preprocess = transforms.Compose([
    transforms.CenterCrop((300, 225)),  # Crop the image to a 4:3 aspect ratio
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def preprocess_image(image: Image.Image) -> torch.Tensor:
    image = preprocess(image)
    return image.unsqueeze(0)

def make_prediction(processed_image: torch.Tensor, age: int, sex: str, localization: str) -> dict:
    # Convert sex and localization to numerical values (e.g., using one-hot encoding)
    sex_encoded = 1 if sex == 'male' else 0  # Example encoding
    localization_encoded = ...  # Implement encoding for localization

    # Combine the image tensor with the additional inputs
    combined_input = torch.cat((processed_image, torch.tensor([[age, sex_encoded, localization_encoded]])), dim=1)

    with torch.no_grad():  # Disable gradient calculation
        predictions = model(combined_input)  # Forward pass
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
