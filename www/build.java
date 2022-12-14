// keywords:
// content of directiory
// read file to byte array
// write text file
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
class build {
    public static void main(String[] args)
    throws IOException
    {
        System.out.println("Building...");
        String buildname = "build";
        String build = "./"+buildname+"/";
        String path = "./src/";
        String name = "src_content";
        String data = "build."+name+"=[\n";
        String tail = "]\n";
        String list = ".keys=[";
        File directoryPath = new File(path);
        String contents[] = directoryPath.list();
        for(int i=0; i<contents.length; i++) {
            System.out.println(contents[i]);
            File file = new File(path+contents[i]);
            byte[] fc = Files.readAllBytes(file.toPath());
            data += "`" + new String(fc) + "`,\n";
            tail += buildname + '.' + name + "['" + contents[i] + "']";
            tail += "=" + buildname + '.' + name + "[" + i + "]\n";
            list += "'" + contents[i] + "',";
        }
        data += tail + buildname + '.' + name + list + "]";
        File file = new File(build+name+".js");
        FileOutputStream fos = new FileOutputStream(file);
        BufferedOutputStream bos =
            new BufferedOutputStream(fos);
        byte[] bytes = data.getBytes();
        bos.write(bytes);
        bos.close();
        fos.close();
        System.out.println("Good!");
    }
}
