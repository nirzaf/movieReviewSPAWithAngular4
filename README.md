# MovieReviewSPA-NG4
Once cloned, then run npm install to install all the dependencies. Then, run webpack command to make sure bundle is properly created and aligned with command **webpack --config webpack.config.vendor.js**
Next, run webpack command to make suer that bundle is properly created.

## Note:- Follow below steps, if while running EF core hasn't resolved automatically.

# INSTALLING DOTNET CLI FOR EF: -
In this section, we will use Migrations to build our database. Migrations are ways to use tooling in Entity Framework to look at the database and requirements of the application and build a set of code to toggle the database from one version to another. When we run migrations or use migrations for the first time, it will build the database. This will become version one of the database. 

And as the development progresses, we can add new versions to the project. Here, in order to do the migrations, we will use the command line tool. But, in order to use this tool, we need to add Command Line Interface (CLI) support. Now, the easy way to do this is to add the following command to the .csproj file and then restore the same.

If you are running on **asp.net core 2.0**, then apply below command 

```xml
<ItemGroup>
    <DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" Version="2.0.0" />
  </ItemGroup>
 ```
 else
```xml
<ItemGroup>
    <DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" Version="1.0.0" />
  </ItemGroup>
 ```
 then, **dotnet restore** and **dotnet build**.

Once it gets installed successfully, then dotnet ef command should give you below screen.

![image.png](https://user-images.githubusercontent.com/3886381/37359616-18566642-2714-11e8-8715-75e997bbdb45.png)

# CREATING THE DATABASE: -

In order to create the database, we will do migrations. In order to use migrations, we need to execute dotnet ef migrations add InitialDb. As soon as I execute this file, it will show the following error:

![image.png](https://user-images.githubusercontent.com/3886381/37359653-3181b270-2714-11e8-83a1-4828d6bd33b2.png)

It clearly says that I forgot to add the following package. I can add the package from NuGet itself. However, this time; I will add it via the command line
 “**dotnet add package Microsoft.EntityFrameworkCore. Design**” as shown below.

![image.png](https://user-images.githubusercontent.com/3886381/37359696-4c4b5e1c-2714-11e8-9863-7a9ce4aa7b6c.png)

After this, I will use the command dotnet restore. Once the restore is completed, I will again execute the migration command dotnet ef migrations add InitialDb. It will show the following error:

![image.png](https://user-images.githubusercontent.com/3886381/37359751-6c465b5e-2714-11e8-8294-9a132eae63c1.png)

Here, it’s basically saying that you need to change the migration assembly to MovieReviewSPA.web via DBContextOptionsBuilder. Here is the snippet for the same. 

```cs
   public void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFramework()
               .AddDbContext<MovieReviewDbContext>(options =>
                    options.UseSqlServer(Configuration["Data:MovieReviewSPA:ConnectionString"],
                        b => b.MigrationsAssembly("MovieReviewSPA.web")));

            // Add framework services.
            services.AddMvc();
        }
```
Which is already there in the code. Hence, you don’t need to do anything. It may happen, that you again the same error. But not to worry because db has created in the localdb. This is interim problem, which was already opened in git. Basically, this arises when data model folder is different from dbcontext project. Already explained in the book. MS will fix this as they are having in their backlog.

![image.png](https://user-images.githubusercontent.com/3886381/37359790-849adbda-2714-11e8-918f-7f1f1db756c5.png)

Now, at this moment, when you go and try to see database in localdb, then it will appear like 

![image.png](https://user-images.githubusercontent.com/3886381/37359839-a366cdee-2714-11e8-9807-aef5e7e1e905.png)


