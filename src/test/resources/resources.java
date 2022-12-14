class resources {
    public static void main(String []args)
    {
        String data="Resourses tested OK!";
        System.out.println(data);
        java.io.File file = new java.io.File("./resourses-test");
        try(FileOutputStream fos = new FileOutputStream(file);
                BufferedOutputStream bos = new BufferedOutputStream(fos)) {
            byte[] bytes = data.getBytes();
            bos.write(bytes);
            bos.close();
            fos.close();
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
    }
}