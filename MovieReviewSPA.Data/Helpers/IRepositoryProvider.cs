﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieReviewSPA.Data.Contracts;

namespace MovieReviewSPA.Data.Helpers
{
    /// <summary>
    /// Interface for a class that can provide repositories by type.
    /// The class may create the repositories dynamically if it is unable
    /// to find one in its cache of repositories.
    /// </summary>
    /// <remarks>
    /// Repositories created by this provider tend to require a <see cref="DbContext"/>
    /// to retrieve data.
    /// </remarks>
    public interface IRepositoryProvider
    {
        /// <summary>
        /// Get and set the <see cref="DbContext"/> with which to initialize a repository
        /// if one must be created.
        /// </summary>
        DbContext DbContext { get; set; }

        /// <summary>
        /// Get an <see cref="IRepository{T}"/> for entity type, T.
        /// </summary>
        /// <typeparam name="T">
        /// Root entity type of the <see cref="IRepository{T}"/>.
        /// </typeparam>
        IRepository<T> GetRepositoryForEntityType<T>() where T : class;

        /// <summary>
        /// Get a repository of type T.
        /// </summary>
        /// <typeparam name="T">
        /// Type of the repository, typically a custom repository interface.
        /// </typeparam>
        /// <param name="factory">
        /// An optional repository creation function that takes a <see cref="DbContext"/>
        /// and returns a repository of T. Used if the repository must be created.
        /// </param>
        /// <remarks>
        /// Looks for the requested repository in its cache, returning if found.
        /// If not found, tries to make one with the factory, fallingback to 
        /// a default factory if the factory parameter is null.
        /// </remarks>
        T GetRepository<T>(Func<DbContext, object> factory = null) where T : class;


        /// <summary>
        /// Set the repository to return from this provider.
        /// </summary>
        /// <remarks>
        /// Set a repository if you don't want this provider to create one.
        /// Useful in testing and when developing without a backend
        /// implementation of the object returned by a repository of type T.
        /// </remarks>
        void SetRepository<T>(T repository);
    }
}
