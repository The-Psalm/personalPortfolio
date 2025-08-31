# How to Add Your Profile Photo

## Step 1: Prepare Your Photo
1. Take or choose a professional photo of yourself
2. Recommended dimensions: 400x400px (square format)
3. Supported formats: JPG, PNG, WebP
4. Keep file size under 500KB for optimal loading

## Step 2: Add Photo to Project
1. Save your photo in the `src/assets/images/` folder
2. Name it something like `profile.jpg` or `samuel-profile.jpg`

## Step 3: Update ProfileImage Component
Open `src/components/ProfileImage.jsx` and:

1. **Import your photo** at the top of the file:
```jsx
import profilePhoto from '../assets/images/profile.jpg'; // Replace with your file name
```

2. **Replace the placeholder** with your actual photo by uncommenting and updating these lines:
```jsx
{/* Replace the entire placeholder div with this: */}
<img
  src={profilePhoto}
  alt="Adebusuyi Samuel - Fullstack Web Developer"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

3. **Remove or comment out the placeholder div**:
```jsx
{/* Remove this entire section:
<div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
  <div className="text-center">
    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
      AS
    </div>
    <p className="text-sm text-gray-400">Replace with</p>
    <p className="text-sm text-gray-400">your photo</p>
  </div>
</div>
*/}
```

## Step 4: Optional - Optimize Photo
For best results, you can:
- Crop the photo to focus on your face and upper body
- Ensure good lighting and professional appearance
- Use tools like Photoshop, GIMP, or online tools to enhance if needed

## Example Final Code
Your `ProfileImage.jsx` should look like this after adding your photo:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import profilePhoto from '../assets/images/profile.jpg'; // Your photo import

const ProfileImage = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`relative ${className}`}
    >
      {/* ... background rings code stays the same ... */}
      
      <div className="relative z-10 w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-white/10 shadow-2xl">
        <img
          src={profilePhoto}
          alt="Adebusuyi Samuel - Fullstack Web Developer"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-blue-400/20" />
      </div>
      
      {/* ... floating particles code stays the same ... */}
    </motion.div>
  );
};

export default ProfileImage;
```

After making these changes, run `npm run build` again to update your portfolio with your actual photo!
