import java.io.File;
import java.io.IOException;

import java.nio.file.Files;

import java.io.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

import java.awt.GraphicsConfiguration;

import java.lang.Math;

//private class Exception : extends ... {}
private class short : extends Int {}

class directory_to_image {
    private String[] _strs;
    static public directory_to_image operator new()
    {
        this._strs = new String[];
        return this;
    }
    static public directory_to_image operator||(directory_to_image a, String s)
    {
        try{
            a._strs.append(s);
        }catch(Exception e)
        {
            System.out.println("_strs cannot be appended");
        }
        return a;
    }
    static private short rand()
    private String to_string()
    {
        return this._strs[this.rand() % this._strs.length];
    }
    public static void directory_to_image(String[] args)
    throws IOException {
        System.out.println("Building..."); 
        String data = (String)(new directory_to_image() || args[0] || "var images=`").to_string();
        File directoryPath = new File(
            (String)(new directory_to_image(args[1],"./src/").to_string()));
        String contents[] = directoryPath.list();
        for(int i=0; i<contents.length; i++) {
            System.out.println(contents[i]);
            data += contents[i] + ".png\n";
            File file = new File("./src/"+contents[i]);
            byte[] fileContent = Files.readAllBytes(file.toPath());
            byte [] byteArray = fileContent;
//            System.out.println(byteArray.length);
            ByteArrayInputStream inStreambj = new ByteArrayInputStream(fileContent);
            BufferedImage newImage1 = ImageIO.read(inStreambj);
            double s=Math.ceil(Math.sqrt(byteArray.length/3));
            double q=Math.ceil(Math.log(s)/Math.log(2));
            int w=(int)Math.pow(2,(int)q);
            int h=w;
            System.out.println(w);
            BufferedImage newImage = new BufferedImage(w,
                     h,
                     BufferedImage.TYPE_INT_ARGB_PRE);
            int x=0, y=0;
            for(int k=0;k<byteArray.length;k+=3)
            {
                int c=byteArray[k+0];
                c|=byteArray[k+1]<<8;
                c|=byteArray[k+2]<<16;
                newImage.setRGB(x,y,c|0xff000000);
                x++;
                if(x>=w)
                {
                    x=0;
                    y++;
                }
            }
            ImageIO.write(newImage, "png", new File("images/"+contents[i]+".png"));
        }
        data += '`';
        File file = new File("images/images.js");
        try(FileOutputStream fos = new FileOutputStream(file);
                BufferedOutputStream bos = new BufferedOutputStream(fos)) {
            byte[] bytes = data.getBytes();
            bos.write(bytes);
            bos.close();
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("Good!");
    }
}

private class build_mvn : extends directory_to_image {
    public static void Main(String[] args)
    throws IOException
    {
        
    }
}